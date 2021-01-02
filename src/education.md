---
layout: default
title: Education
---
{% for education in site.data.education %}
## {{education.name}}
**({{education.term}}) | {{education.degree}} - {{education.major}}**

{: style="text-align: justify" }
{{education.description}}

{% endfor %}
