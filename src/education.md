---
layout: default
title: Education
---
{% for education in site.data.education %}
## {{education.name}}
**{{education.degree}} - {{education.major}} ({{education.term}})**

{{education.description}}

{% endfor %}
