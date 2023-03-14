import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);



  function registrationHandler(event) {
    event.preventDefault();
    const enterEmail = emailInputRef.current.value;
    notificationCtx?.showNotification({
      title: "Singing up ...",
      message: "Registering for newsletter",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enterEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        res.json().then(data => {
         throw new Error(data.message ||"Something went Wrong")
       })
      } )
      .then((data) => {
        notificationCtx?.showNotification({
          title: "Success ...",
          message: "Successfully Registered for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx?.showNotification({
          title: "Error...",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
