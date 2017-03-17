using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShibbolethSampleMVC.Models;

namespace ShibbolethSampleMVC.Controllers
{
    public class AuthorizeController : Controller
    {
        private DatabaseEntities db = new DatabaseEntities();
        // GET: Authorize
        public ActionResult Index()
        {
            if (SessionWrapper.Current.User == null)
            {
                SessionWrapper.Current.LoadUser(Request.Headers);

                //var dbUser = db.Users.FirstOrDefault(u => u.Ename == SessionWrapper.Current.User.Ename);
                var dbUser = db.Users.FirstOrDefault(u => u.Ename == "cdedward");
                if (dbUser != null)
                {
                    
                    //dbUser.LastLogin = SessionWrapper.Current.LoginTime;
                    dbUser.LastLogin = DateTime.Now;
                    db.Entry(dbUser).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            // If debugging, show the contents of the logged in user
            // return View(SessionWrapper.Current.User);

            // In a real application, you would direct the user where you would like them to go
            return RedirectToRoute(SessionWrapper.Current.Destination.Values);
        }

        public ActionResult UnAuthorized()
        {
            return View();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}