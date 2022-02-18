<h1 align='center'> CMS </div>

## About Project

The AlgaNews project aims to be a technology news portal, aimed at developers and technology enthusiasts in general.

The project development has 3 stages; 3 software (which will be accepted below in this document) that must be hosted and received via the internet (by browsers).

The full functioning of the project depends on the 3 softwares previously mentioned, each of which has a specialty that will also be needed in this document.

It is also worth mentioning that the project is in the MVP phase. This means that only characteristics (hereafter called characteristics) considered essential for the validation of the project will be inserted.

## Of users

The AlgaNews project foresees 4 types of users:

-   Visitor
-   Editor
-   Administrative assistant
-   Manager

## Of software

The development of the AlgaNews project will feature 3 software:

-   CMS
-   Blog / Portal
-   Admin

Each software has a fundamental role in the AlgaNews project,
and is indispensable for its launch. The non-delivery of some software
and its foreseen functionalities will also imply in the non-delivery of the AlgaNews project.

## Briefing CMS

### Technologies

-   Reactjs
-   TypeScript
-   OAuth2
-   REST
-   Styled-Components
-   Storybook

### Definitions

-   What does CMS mean? CMS is an acronym for Content Management System,
-   What is the purpose of the software? Content management (publications, hereinafter referred to as posts) by editors.
-   What type(s) of users should access this software? Access to this software must be unique and exclusive to the Publishers.
-   What are the features of this software?
    -   Registration of new posts
    -   Editing of registered posts by the editor
    -   View all published posts
    -   Viewing unpublished posts created by the editor
    -   Viewing performance metrics
    -   Viewing the editor's own detailed personal information
    -   Viewing public information from other publishers
    -   Session control (login/logout)
    -   Previewing an \*earnings estimate when creating a post
-   The software's visual interface need to follow some guideline? You need to follow, as faithfully as possible, the guideline presented in Figma (links at the end of the document)
-   The software's visual interface need to be responsive (adapt to multiple screens)? No. Our editors work exclusively on a standard notebook with 1366x768 resolution and the interface should only be optimized for this resolution. Access via tablets or smartphones does not need to be restricted, we just chose not to release resources with a responsiveness that will not be used.
-   The user must remain authenticated even after closing the software "windows"? Yes it must.
-   Where the user must be redirected to after logging out? To the login screen.
