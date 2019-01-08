variable "app_name" {
  description = "Name given to this application instance"
}

variable "bucket_name" {
  description = "Name of the bucket to store the dashboard files"
}

variable "jenkins_user" {
  description = "User who kicked off the Jenkins job"
}

terraform {
  backend "s3" {
    bucket               = "pipeline-state.liatr.io"
    region               = "us-east-1"
    key                  = "pipeline-dashboard.tfstate"
    workspace_key_prefix = "demo"
    dynamodb_table       = "pipeline-state-lock"
    encrypt              = "true"
  }
}

provider "aws" {
  region  = "us-east-1"
  version = "~> 1.54"
}

resource "aws_s3_bucket" "b" {
  bucket        = "${var.bucket_name}"
  acl           = "public-read"
  force_destroy = true

  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicReadGetObject",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.bucket_name}/*"]
    },
    {
      "Sid":"JenkinsPutObject",
      "Effect":"Allow",
      "Principal":{"AWS":["arn:aws:iam::003744521125:user/SVC-Jenkins"]},
      "Action":["s3:PutObject"],
      "Resource":["arn:aws:s3:::${var.bucket_name}/*"]
    }
  ]
}
POLICY

  website {
    index_document = "index.html"
    error_document = "error.html"

    routing_rules = <<EOF
[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
EOF
  }

  tags {
    Environment  = "demo"
    Client       = "liatrio"
    Project      = "Demo Pipeline"
    Owner        = "${var.jenkins_user}"
    DemoPipeline = "${var.app_name}"
  }
}

data "aws_route53_zone" "domain" {
  name = "liatr.io"
}

resource "aws_route53_record" "dashboard_url" {
  zone_id = "${data.aws_route53_zone.domain.zone_id}"
  name    = "${var.bucket_name}"
  type    = "A"

  alias {
    name                   = "${aws_s3_bucket.b.website_domain}"
    zone_id                = "${aws_s3_bucket.b.hosted_zone_id}"
    evaluate_target_health = true
  }
}
