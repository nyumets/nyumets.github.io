# nyumets.org public site

This site is built with [Jekyll and Github Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).  The changes will be propagated as soon as they are merged to the `main` branch.

## Setup

### Prerequisites

You will need to have the following tools installed

- ruby - You can manage this with [Ruby Version Manager RVM](https://rvm.io/)
- (optional) [bundler](https://bundler.io/) - A ruby dependency manager
- [jekyll](https://jekyllrb.com/) - Once you have the previous two installed, you can rum `bundle install` in the repo directory, which will use the `Gemfile` to install additional dependencies

### Making changes locally

Once the prerequisites are installed, you can run `bundle exec jekyll serve` to start the dev server at http://localhost:4000.  Changes to files within `src/` will be auto-reloaded, but changing the site structure in `_config.yml` will require you to stop and restart the dev server.

### Changing the header or site layout

Edit `{repo_root}/_config.yml` and modify the section near the top that starts with `navbar-links:`.  The page path values will be relative to the `src/` directory.

### .html vs .md

Jekyll pages can be either `.html` or `.md`.  To keep things standard, `.md` is the simplest as it will generate pages for you using existing templates.  If you need special layouts for images etc, then switch to `.html`.

### Adding new blog posts

Add a new file to `src/_posts/`.  The filename MUST conform to the format `YYYY-MM-DD-title.{md|html}` so that Jekyll will know how to organize the post.


# TODO
See NYU OLAB Admin board for e-mails and ToDo Items

