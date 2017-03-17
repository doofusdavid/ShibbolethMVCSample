using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace ShibbolethSampleMVC.Models
{
    public class ShibbolethPrincipal : GenericPrincipal
    {

        public string AriesID { get; set; }
        public string AssociateID { get; set; }
        public string CSUID { get; set; }
        public string EID { get; set; }
        public string Ename { get; set; }
        public string EIDAccountType { get; set; }
        public string EIDIRID { get; set; }
        public string DisplayName { get; set; }
        public string Nickname { get; set; }
        public string PrincipalName { get; set; }
        public string ScopedAffiliation { get; set; }
        public string TargetedID { get; set; }
        public string GivenName { get; set; }
        public string Mail { get; set; }
        public string SN { get; set; }

        // and just in case, a collection of ALL the properties from the IDP is maintaned, can be looped through, etc.
        public NameValueCollection AllAttributes { get; set; }

        public ShibbolethPrincipal(NameValueCollection headers)
           : base(new GenericIdentity(GetUserIdentityFromHeaders()), GetRolesFromDatabase())
        {
            // for individual properties, put the headers into a dictionary (dictionaries are faster and have better methods)
            // (both pairs of this particular NameValueCollection are strings)
            var dictionary = new Dictionary<string, string>();
            foreach (string key in headers)
            {
                dictionary.Add(key, headers[key]);
            }

            // use the dictionary's TryGetValue to set properties.
            // This has the convenient outcome of leaving things null if they aren't in the headers. 
            string myPropertyVal;

            if (dictionary.TryGetValue("colostateEduPersonAriesID", out myPropertyVal))
                AriesID = myPropertyVal;

            if (dictionary.TryGetValue("colostateEduPersonAssociateID", out myPropertyVal))
                AssociateID = myPropertyVal;

            if (dictionary.TryGetValue("colostateEduPersonCSUID", out myPropertyVal))
                CSUID = myPropertyVal;

            if (dictionary.TryGetValue("colostateEduPersonEID", out myPropertyVal))
            {
                EID = myPropertyVal;
                Ename = myPropertyVal;
            }

            if (dictionary.TryGetValue("colostateEduPersonEIDAccountType", out myPropertyVal))
                EIDAccountType = myPropertyVal;

            if (dictionary.TryGetValue("colostateEduPersonEIDIRID", out myPropertyVal))
                EIDIRID = myPropertyVal;

            if (dictionary.TryGetValue("displayName", out myPropertyVal))
                DisplayName = myPropertyVal;

            if (dictionary.TryGetValue("eduPersonNickname", out myPropertyVal))
                Nickname = myPropertyVal;

            if (dictionary.TryGetValue("eduPersonPrincipalName", out myPropertyVal))
                PrincipalName = myPropertyVal;

            if (dictionary.TryGetValue("eduPersonScopedAffiliation", out myPropertyVal))
                ScopedAffiliation = myPropertyVal;

            if (dictionary.TryGetValue("eduPersonTargetedID", out myPropertyVal))
                TargetedID = myPropertyVal;

            if (dictionary.TryGetValue("givenName", out myPropertyVal))
                GivenName = myPropertyVal;

            if (dictionary.TryGetValue("mail", out myPropertyVal))
                Mail = myPropertyVal;

            if (dictionary.TryGetValue("sn", out myPropertyVal))
                SN = myPropertyVal;

            // for the collection, just pass through the assignment. This preserves the ability to loop through all headers for completeness.
            AllAttributes = headers;
        }

        private static string[] GetRolesFromDatabase()
        {
            if (HttpContext.Current.Request.Headers["Host"].Contains("localhost"))
            {
                SessionWrapper.Current.Authorized = true;
                return new string[] { "admin" };
            }

            var db = new DatabaseEntities();
            var ename = HttpContext.Current.Request.Headers["colostateEduPersonEID"];

            if (String.IsNullOrEmpty(ename)) return new string[] {""};

            var user = db.Users.Include("Roles").SingleOrDefault(u => u.Ename == ename);
            if (user != null)
            {
                SessionWrapper.Current.Authorized = true;
                SessionWrapper.Current.LoginTime = DateTime.Now;

                return user.Roles.Select(r => r.Name).ToArray();
            }
            else
            {
                SessionWrapper.Current.Authorized = false;
                return new string[]{""};
            }
        }

        public static string GetUserIdentityFromHeaders()
        {
            if (HttpContext.Current.Request.Headers["Host"].Contains("localhost"))
            {
                // Put your developer credentials here
                return "cdedward";
            }
            return HttpContext.Current.Request.Headers["colostateEduPersonEID"];
        }
    }
}