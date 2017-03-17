using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShibbolethSampleMVC.Models;

namespace ShibbolethSampleMVC.Filter
{
    public class AuthorizationFilter : ActionFilterAttribute
    {
        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="AuthorizationFilter"/> is auth.
        /// Does the action require user to be autheniticated?
        /// </summary>
        /// <value><c>true</c> if auth; otherwise, <c>false</c>.</value>
        public bool Auth { get; set; }

        /// <summary>
        /// Gets or sets the roles.
        /// What roles may access the controller action? A role of "0" assumes all authenticated users may access the action.
        /// </summary>
        /// <value>The roles as a pipe (|) delineated string, example: "1|2|3|4".</value>
        public string Roles { get; set; }

        /// <summary>
        /// Called by the MVC framework before the action method executes.
        /// </summary>
        /// <param name="filterContext">The filter context.</param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // Redirect user if not authenticated
            if (!SessionWrapper.Current.Authorized && Auth)
            {
                SessionWrapper.Current.Destination = filterContext.RouteData;
                filterContext.Result = new RedirectResult("~/Authorize");
                return;
            }

            // check user role
            if (!BelongsToRole(Roles))
            {
                SessionWrapper.Current.Destination = filterContext.RouteData;
                filterContext.Result = new RedirectResult("~/Authorize");
                return;
            }

            base.OnActionExecuting(filterContext);
        }

        /// <summary>
        /// Belongs to role. Interates over a string of roles delineated by pipes
        /// </summary>
        /// <param name="roles">The roles.</param>
        /// <returns>Boolean</returns>
        private static bool BelongsToRole(string roles)
        {
            if (roles == "0")
            {
                return true;
            }

            string[] rArray = roles.Split('|');
            foreach (string r in rArray)
            {
                if (SessionWrapper.Current.User.IsInRole(r))
                {
                    return true;
                }
            }
            return false;
        }
    }
}