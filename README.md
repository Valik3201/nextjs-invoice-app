# Next.js Invoice App

## Description

A full-stack web application built with Next.js for managing invoices. This project includes functionalities for creating, editing, and viewing invoices, leveraging the capabilities of Next.js, Tailwind CSS, and Firebase for a seamless user experience.

## Features

- Create new invoices
- Edit existing invoices
- View invoice details
- Responsive design with Tailwind CSS
- State management with Redux Toolkit
- Authentication and data storage with Firebase
- Next.js Middleware for handling requests

## Installation

To install and set up this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Valik3201/nextjs-invoice-app.git
   cd nextjs-invoice-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to the project.

4. **Run the development server:**

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Authentication

To access the app, users need to authenticate. You have three sign-in options:

1. **Email and Password**: Enter your credentials directly.
2. **Sign in with Google**: Use your Google account to sign in.
3. **Sign in with Facebook**: Use your Facebook account to sign in.

### Invoice Management

#### Creating an Invoice

1. Navigate to the "Create Invoice" page.
2. Fill out the required details.
3. Save the invoice.

#### Editing an Invoice

1. Select an invoice from the list.
2. Click on "Edit."
3. Modify the details as necessary.
4. Save your changes.

#### Viewing an Invoice

To view an invoice, simply select it from the list to see its details.

### Profile Management

On the profile page, users can manage their account settings:

- **Change Name**: Update your displayed name.
- **Change Email**: Modify your registered email address.
- **Verify Email**: Confirm your email address.
- **Change Avatar**: Upload or adjust your profile picture with cropping functionality.
- **Change Password**: Update your login password.

#### Password Recovery

If you forget your password, visit the "Forgot Password?" page on the Sign-In screen for assistance.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed superset of JavaScript
- **Redux Toolkit**: State management
- **Firebase**: Backend as a Service for authentication and database

## Fullstack Capabilities

This project demonstrates fullstack capabilities by integrating frontend development with backend services using Firebase. The app handles user authentication, data storage, and server-side rendering efficiently.

## Next.js Authentication Middleware

Next.js middleware manages authentication and route protection in the project:

- **Authentication Check**: Verifies the presence of a token (`__token__`) in request cookies.
- **Route Protection**: Defines which routes (`publicRoutes` and `protectedRoutes`) require authentication.

- **Redirect Logic**:

  - Authenticated: Redirects from public routes to the homepage (`/`); allows access to protected routes.
  - Not authenticated: Redirects from protected routes to the signin page (`/signin`).

- **Configuration**:
  - Uses a `matcher` to exclude specific routes (`/api`, `_next/static`, `_next/image`, `favicon.ico`).

Customize `publicRoutes` and `protectedRoutes` as needed for your application's routing requirements.

## Useful Sources

- [Create Full Stack App with Next.js and Firebase](https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/)
- [Personal Movie Bookmark Application](https://dev.to/thankgod/crafting-your-personal-movie-bookmark-application-using-next-13413-redux-toolkit-firebase-and-typescript-2dgj)
- [Image Upload Modal in React](https://dev.to/mizanrifat/creating-an-image-upload-modal-with-crop-and-rotate-functionality-in-react-5cbd)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Documentation](https://redux.js.org/introduction/getting-started)
- [Firebase Documentation](https://firebase.google.com/docs)

## Contributing

We welcome contributions to enhance the project. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact Information

For any inquiries or support, please reach out to the project maintainer at valik3201@gmail.com.

## Acknowledgments

Special thanks to [Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl) for providing the challenge that inspired and guided this project. Their platform provides a great opportunity to practice frontend development skills and showcase projects.

Don't forget to give the project a star! Thanks again!
