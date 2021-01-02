---
layout: default
title: Experience
---
{% for experience in site.data.experience %}
## {{experience.affiliation}}
**{{experience.designation}} ({{experience.term}})**

{{experience.description}}

{% endfor %}