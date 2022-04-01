# nyumets.org public site

This site is built with [Jekyll and Github Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).  The changes will be propagated as soon as they are merged to the `main` branch.

You can run `bundle exec jekyll serve` to start the dev server at http://localhost:4000 and preview your changes.  Any `.md` or `.html` file that starts with the Jekyll "front matter" markers will be picked up and generated into a page.

Example:

```
# new_page.md
---
---

This is some page content.  The two lines of "---" are the front matter markers.
```

## Technical Setup

### Prerequisites

You will need to have the following tools installed

- ruby - You can manage this with [Ruby Version Manager RVM](https://rvm.io/)
- (optional) [bundler](https://bundler.io/) - A ruby dependency manager
- [jekyll](https://jekyllrb.com/) - Once you have the previous two installed, you can rum `bundle install` in the repo directory, which will use the `Gemfile` to install additional dependencies

### Changing the header or site layout

Edit `{repo_root}/_config.yml` and modify the section near the top that starts with `navbar-links:`.

### .html vs .md

Jekyll pages can be either `.html` or `.md`.  To keep things standard, `.md` is the simplest as it will generate pages for you using existing templates.  If you need special layouts for images etc, then switch to `.html`.  Both types of files need to start with the "front matter" markers, and can include some metadata that Jekyll will use to dynamically build the page html.

### Adding new blog posts

Add a new file to `_posts/`.  The filename MUST conform to the format `YYYY-MM-DD-title.{md|html}` so that Jekyll will know how to organize the post.

## Administrative Procedure

Generally speaking we want to create new "Posts" for major data releases or updates to the datasets that we're hosting on AWS. Additionally, every major publication should be accompanied by a post describing the publication, how it works with the datasets, and how to access it on AWS (ideally this will involve a demo in Jupyter).

# TODO
See NYU OLAB Admin board for e-mails and ToDo Items

