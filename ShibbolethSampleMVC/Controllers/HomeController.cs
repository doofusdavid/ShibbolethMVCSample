using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShibbolethSampleMVC.Filter;

namespace ShibbolethSampleMVC.Controllers
{
    public class HomeController : Controller
    {
        [AuthorizationFilter(Auth=true, Roles="admin")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}