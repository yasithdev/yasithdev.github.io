---
layout: default
title: Projects
---
{% for project in site.data.projects %}
## {{project.title}}
**({{project.term}})** | {% for t in project.technologies %} ```{{t}}``` {% endfor %}

{{project.description}}

{% endfor %}