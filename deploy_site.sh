#!/bin/bash
aws s3 sync . s3://note.joelplums --exclude ".DS*" --exclude ".git*" --exclude "*.sh" --exclude "*.pdf" --exclude "README.md"  --exclude "LICENSE" --acl public-read
