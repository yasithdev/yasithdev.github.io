---
layout: default
title: Experience
---
{% for work in site.data.work %}
<table><tbody>

<tr class="header"><td>
<strong>{{ work.affiliation }}</strong>
<span>({{ work.term }})</span>
<br/>
<small><strong>{{ work.designation }}</strong></small>
</td></tr>

<tr><td style="text-align: justify">
{{ work.description | markdownify }}
</td></tr>

</tbody></table>
{% endfor %}