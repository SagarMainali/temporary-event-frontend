# Temporary Event Frontend – High-Level Documentation

**Live Prototype**: https://sagarmainali.com.np

A prototype CMS (Content Management System) for event organizers to create, customize, and publish temporary event websites. Built as a multi-tenant SaaS-like application, it allows users to manage multiple events, clone templates, edit content section-by-section, and publish sites via custom subdomains.
This is a high-level prototype; future iterations may migrate to Next.js + TypeScript and incorporate state management (e.g., Redux/Zustand) and form handling libraries (e.g., React Hook Form).










---

## Tech Stack

| Layer       | Technology                                     | Purpose                         |
| ----------- | ---------------------------------------------- | ------------------------------- |
| Frontend    | React + Vite                                   | Fast SPA development            |
| Routing     | React Router                                   | Client-side navigation          |
| HTTP Client | Axios + Interceptors                           | Automatic JWT cookie handling   |
| Auth        | JWT Access + Refresh Tokens (httpOnly cookies) | Secure stateless authentication |
| Backend     | Express.js + Mongoose                          | REST API                        |
| Database    | MongoDB (single DB, 4 collections)             | Multi-tenant relational data    |
| Deployment  | Vercel (wildcard subdomains)                   | Zero-config hosting             |








---

## Key Concepts & User Types

| User Type       | URL Example                        | Experience                          | Auth Required? |
| --------------- | ---------------------------------- | ----------------------------------- | -------------- |
| Event Organizer | `https://domain.com` (main domain) | Full CMS dashboard & editor         | Yes (JWT)      |
| Website Visitor | `https://*.domain.com` (subdomain) | Public published event website only | No             |

[reason]








---

## CMS: User Flow and Actions

This section outlines the high-level steps for event organizers using the CMS. All actions require authentication; unauthenticated users are redirected to login screen.

### 1. Authentication

- **Register**: New user registers from the register page.
- **Login**: Enter credentials (email/password) on the login page.
  - On success, the backend issues an `accessToken` (short-lived JWT) and `refreshToken` (long-lived), both stored as secure HTTP-only cookies.
  - Axios interceptor automatically attaches these cookies to subsequent API requests.
  - If an expired `accessToken` is used in the request, the interceptor uses the `refreshToken`(issued by the backend via API) to issue a new `accessToken` (transparent to the frontend).
  - Invalid/expired `refreshToken` triggers logout.
- **Logout**: Clears cookies and redirects to login.

### 2. CMS Overview

After login, the user lands on the homepage of the CMS. The editor allows user to perform necessary actions from creating event to publishing website. As of now the main actions that user can perform are:

- CRUD operations on Event and Website
- Publish/Unpublish Website

### 3. Create an Event

- Click **"Create Event"** → Fill in basic details (e.g., title, date, location).
- **Save**: Creates a new document in the **Events** collection, linked to the user's ID.
- Proceed to **"Build Website"** for this event.

### 4. Clone a Template

- Browse available templates (fetched from the **Templates** collection).
- Select one → **"Choose Template"**.
  - This duplicates the template's placeholder sections into a new **Website** document:
    - Links: **Website → Event** (via Event ID), **Website → baseTemplate** (Template ID).
    - Status: **Draft** (unpublished).

### 5. Edit Website Sections

- Upon template selection, automatically navigate to the event's website editor.
- The editable sections (e.g., Hero, Schedule, Gallery, Footer, etc) are marked with an 'edit icon' to edit which can be clicked to open its corresponding editor.
  - Each section supports content types like text, images and video(to be added later).
  - The updated contents are saved locally first by sections. [reason]
- Real-time previews of the updated website.
- **"Save All"**: Updates the **Website** document in the database with the updated contents. This action also clears the locally saved data.

### 6. Publish Website

- In the editor, click **"Publish"**.
- Provide a subdomain (e.g., **"photography-class"**).
- **Submit**: Backend validates the uniqueness of the user provided subdomain, checks if other website is alerady using it and generates full URL (e.g., `https://photography-class.domain.com`.
- Share the URL with visitors: They access a read-only, static-like rendered site (no CMS access).

### 7. Unpublishing Website

- Unpublishing website removes the associated subdomain of the website which eventually makes it inaccessible for public user.
- Necessary fields from the **Website** document are also updated like _url_, _published_, etc.

### 8. Editing Website after publishing

- The website can be updated in the same manner regardless of its _publish_ status.

### 9. Delete Website

- Deleting website will entirely:
  - dissociate it from the public user(if it has been publised)
  - remove associated subdomain
  - remove references(Cascading Delete)









---

## Website: User Flow and Actions

### 1. Submit form

- If the published website has a form, visitor can submit by filling necessary information. For eg: _register_, _contact_, etc.

### 2. Make Payments(eg: for later)

- User should also be able to make payments(for eg: _buy ticket_)







---

## MongoDb Collections Overview

| Collection    | Description                                                                         | Key Relations                                                      |
| ------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Users**     | Stores user profiles, authentication data, and owned events.                        | `events`: Array of Event IDs created by the user.                  |
| **Events**    | Stores event details (e.g., title, date, description).                              | `website`: ID of the associated Website document.                  |
| **Templates** | Pre-defined placeholder templates for cloning.                                      | `baseTemplate`: Referenced by Websites as the source template ID.  |
| **Websites**  | Stores customized, published/unpublished sites with section content (text, images). | `baseTemplate`: ID of the cloned Template; linked to parent Event. |

---








## Project Setup

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SagarMainali/temporary-event-frontend.git
   cd temporary-event-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   - Create a `.env` file in the root(check .env.example for reference):

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Build and Production

1. **Build for production**:

   ```bash
   npm run build
   ```

2. **Preview the build**:

   ```bash
   npm run preview
   ```

3. **Deploy to Vercel**:
   - Connect the repo via the Vercel dashboard for automatic deploys.

### Scripts (from `package.json`)

- **dev**: Start the dev server with Vite.
- **build**: Build optimized assets.
- **preview**: Serve the production build locally.
