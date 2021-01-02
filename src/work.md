---
layout: default
title: Experience
---
{% for work in site.data.work %}
## {{ work.affiliation }}
**({{ work.term }}) | {{ work.designation }}**

{: style="text-align: justify" }
{{ work.description | markdownify }}

{% endfor %}