---
version: alpha
name: Test Carbon
description: Fixture design system for API tests.
colors:
  primary: "#0F62FE"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
typography:
  body:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
spacing:
  sm: 8px
  md: 16px
rounded:
  none: 0px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
---

## Overview

Fixture entry: precise, functional, enterprise-scale.

## Colors

The palette leads with IBM Blue `{colors.primary}` on a white `{colors.surface}` field.

## Do's and Don'ts

- Do use `{colors.primary}` for the single primary action per view
- Don't invent token values
