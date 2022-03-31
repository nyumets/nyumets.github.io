#!/bin/bash

bundle exec jekyll build && \
    touch _site/.nojekyll && \
    cp ghpages-config/* _site/