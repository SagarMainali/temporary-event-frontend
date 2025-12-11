# Temporary Event Frontend – High-Level Documentation

**Live Prototype**: https://sagarmainali.com.np

A prototype CMS (Content Management System) for event organizers to create, customize, and publish temporary event websites. Built as a multi-tenant SaaS-like application, it allows users to manage multiple events, clone templates, edit content section-by-section, and publish sites via custom subdomains.
This is a high-level prototype; future iterations may migrate to Next.js + TypeScript and incorporate state management (e.g., Redux/Zustand) and form handling libraries (e.g., React Hook Form).

---

## ⚙️Tech Stack

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

## 👥User Types

| User Type       | URL Example                                 | Experience                          | Auth Required? |
| --------------- | ------------------------------------------- | ----------------------------------- | -------------- |
| Event Organizer | `https://domain.com` (main domain)          | Full CMS dashboard & editor         | Yes (JWT)      |
| Website Visitor | `https://*subdomain.domain.com` (subdomain) | Public published event website only | No             |

---

## 🔷User Flow and Actions(Diagram)

This diagram illustrates the flow for both the main Content Management System (CMS) and the individual tenant websites.

```
              +------------------------------------+
              | domain.com / *subdomain.domain.com |
              +------------------------------------+
                                  |
                                  v
               +----------------------------------+
               |         Vercel Hosting           |
               |      (Single React Build)        |
               +----------------------------------+
                                  |
                                  v
                           +-------------+
                           |  Subdomain? |
                           +-------------+
                                  |
                +-----------------|---------------+
           (No) |                 |               | (Yes)
                v                 |               v
+--------------------------+      |    +--------------------+
| **CMS** (User Actions)   |      |    | **Website**        |
+--------------------------+      |    | (User Actions)     |
| 1. Register/Login        |      |    +--------------------+
| 2. Create Event          |      |    | 1. View Website    |
| 3. Select Template       |      |    | 2. Submit Form/    |
| 4. Start editing sections|      |    | Make payments      |
| 5. Save contents on DB   |      |    +--------------------+
| 6. Provide subdomain &   |      |              |
|    publish site          |      |              |
| 7. Unpublish/Delete      |      |              |
+--------------------------+------|--------------+
                                  |
                                  v
         +-------------------------------------------------+
         |               **Express Backend**               |
         |                  (Shared APIs & logis)          |
         +-------------------------------------------------+
                                  |
                                  v
         +-------------------------------------------------+
         |                  **MongoDB**                    |
         |  (One DB, shared collections using reference)   |
         | I. Users(CMS tenants)                           |
         | II. Events                                      |
         | III. Websites                                   |
         | IV. Templates                                   |
         +-------------------------------------------------+

```

---

## 👨‍💻User Flow and Actions(CMS)

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
  - Each section supports content types like text and images.
  - The updated contents are saved locally first by sections.
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

## 👨‍💻User Flow and Actions(Website)

### 1. Submit form

- If the website has a form, it can be submitted by filling necessary information. For eg: _register_, _contact_, etc.

### 2. Make Payment(to be added later)

- If the website has payment feature(_eg: make payment for event ticket purchase_), user should be able to make payment from the website.

---

## 📦Database Schema and Relationships

| Collection    | Description                                                                         | Key Relations                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Users**     | Stores user profiles, authentication data, and owned events.                        | `events`: Array of Event IDs created by the user in **Events** Collection.                                                                                |
| **Events**    | Stores event details (e.g., title, date, description).                              | `website`: ID of the associated Website document in **Websites** Collection;<br>`organizer` : ID of the associated User document in **Users** Collection. |
| **Templates** | Pre-defined placeholder templates for cloning.                                      | `baseTemplate`: Referenced by Websites as the source template ID.                                                                                         |
| **Websites**  | Stores customized, published/unpublished sites with section content (text, images). | `baseTemplate`: ID of the cloned Template from **Templates** Collection;<br>`belongsToThisEvent` : ID of the associated event from **Events** Collection. |

---

This diagram illustrates the relationships between the core collections in the database.

```

+---------------+
|   Users       |
|---------------|
| _id           |
| events: [ids]-|--(Reference)
| ...           |      |
+---------------+      |
                       |     +-------------+
                       |     |   Events    |
                       |     |-------------|
                       |     | _id         |
                       |-----| organizer   |
                             | website    -|--(Reference)
                             | ...         |       |
                             +-------------+       |
                                                   |     +-------------------+
                                                   |     |   Websites        |
                                                   |     |-------------------|
                                                   |     | _id               |
                                                   |-----| belongsToThisEvent|
                                                         | baseTemplate     -|--(Reference)
                                                         +-------------------+       |
                                                                                     |
                                                                                     |        +-------------+
                                                                                     |        |  Templates  |
                                                                                     |        |-------------|
                                                                                     |--------| _id         |
                                                                                              | ...         |
                                                                                              +-------------+

```

---

## ❓Reason for this over that! (topics to be discussed later)

1. Implemented a **Single API Call** for content updates instead of sending multiple requests for individual sections due to the following architectural benefits:

   - **Efficiency:** Aggregating data into one request **minimizes network overhead** and **latency** (fewer $\text{HTTP}$ round-trips).
   - **Data Integrity:** The single call ensures the entire payload is treated as one **atomic database transaction**, guaranteeing the website document is either fully updated or not updated at all (no inconsistent partial saves).
   - **User Experience (UX):** Allows user edits to be staged **client-side** (local state). This supports rapid editing and reduces unnecessary **write load** on the MongoDB database until the user performs an explicit "Save" action.

2. Single build rather than separate builds for CMS and Website

   - Using wildcard subdomains from vercel makes it much simpler to just use one single build and let the app decide which major component to load simply by reading url. So a single project can serve two different modes(CMS for main domain/Website for subdomain using wildcard subdomains).

3. Images Handling(Cloudinary): Uploads from frontend and deletion from backend

   - **Reduced Bandwidth:** Since contents are first saved locally, uploading directly to cloudinary(using unsigned preset) allows to save the links locally and only send json data(smaller payload) to backend. By utilizing Cloudinary's direct upload feature, files are sent directly from the user's browser to Cloudinary, avoiding unnecessary round trips to the backend. This not only reduces bandwidth but also minimizes server load and processing time.
   - **Privacy:** By limiting image deletion functionality to the backend, it's ensured that sensitive credentials (API key and secret) remain secure. This allows only authenticated user to perform deletetion.
   - **Scalability:**: Cloudinary offloads image storage and delivery, reducing the need for the backend to handle large files and configurations hence allowing it to scale more easily.

4. React over Next(needs migration later)

---

## 🖥️Project Setup

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
