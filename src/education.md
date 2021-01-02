---
layout: default
title: Education
---
{% for education in site.data.education %}
<table><tbody>

<tr class="header"><td>
<strong>{{ education.name }}</strong>
<span>({{ education.term }})</span>
<br/>
<small><strong>{{ education.degree }} - {{ education.major }}</strong></small>
</td></tr>

<tr><td style="text-align: justify">

{{ education.description | markdownify }}

{%- for extra in education.extra -%}
<small><strong>{{ extra.key }}</strong> - {{ extra.value }}.</small>
{% endfor %}

</td></tr>

</tbody></table>
{% endfor %}