---
layout: default
title: Projects
---
{% for project in site.data.projects %}
## {{ project.title }}
**({{ project.term }})** | {% for t in project.technologies %} ```{{ t }}``` {% endfor %}

{: style="text-align: justify" }
{{ project.description | markdownify }}

{% endfor %}