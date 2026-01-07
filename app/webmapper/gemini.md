# Elpusk Web Tools - Project Root

This directory contains the main configuration and orchestration logic for the Elpusk Card Reader Web Tools.

## Core Structure
- **App.tsx**: The central state management hub for device settings and navigation.
- **types.ts**: Contains the Single Source of Truth for device configurations, interfaces, and the virtual keyboard layout.
- **index.tsx & index.html**: Entry points for the React application.
- **metadata.json**: Application metadata for environment permissions.

## Tech Stack
- **React 19**: Modern UI rendering.
- **Vite**: High-performance build tooling.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **Lucide React**: Clean iconography.

## Purpose
A web-based alternative to legacy desktop configuration utilities, allowing users to configure MSR and i-Button readers via HID interfaces in the browser.