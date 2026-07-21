---
version: alpha
name: Fixture Official
description: Snapshot fixture shaped like an Official System entry.
colors:
  primary: "#0F62FE"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#161616"
  error: "#DA1E28"
typography:
  heading:
    fontFamily: IBM Plex Sans
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: IBM Plex Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
spacing:
  sm: 8px
  md: 16px
  lg: 32px
rounded:
  none: 0px
  sm: 4px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.none}"
    padding: 12px 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
---

## Overview

Snapshot fixture: a precise, enterprise-flavored system.

## Colors

Primary blue `{colors.primary}` leads on a white `{colors.surface}` field.
