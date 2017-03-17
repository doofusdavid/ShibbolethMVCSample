using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace ShibbolethSampleMVC.Models
{
    public class SessionWrapper
    {
        public ShibbolethPrincipal User { get; private set; }
        public bool Authorized { get; set; }
        public RouteData Destination { get; set; }
        public DateTime LoginTime { get; set; }

        private SessionWrapper()
        {
            
        }

        public static SessionWrapper Current
        {
            get
            {
                var session = (SessionWrapper) HttpContext.Current.Session["__SessionWrapper__"];
                if (session != null) return session;
                session = new SessionWrapper();
                HttpContext.Current.Session["__SessionWrapper__"] = session;
                return session;
            }
        }

        public void LoadUser(NameValueCollection headers)
        {
            User = new ShibbolethPrincipal(headers);

            /**
             * Here is where you can find and assign roles to your user
             */
           

        }

        public static void DestroySession()
        {
            HttpContext.Current.Session.RemoveAll();
        }
    }
}