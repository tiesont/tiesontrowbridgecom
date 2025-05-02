---
title: Implementing ASP.NET Membership with a Custom Provider
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Implementing ASP.NET Membership with a Custom Provider](/blog/implementing-aspnet-membership-with-a-custom-provider)

Posted on **Tuesday, September 3, 2013**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">security</span></li>
<li><span class="badge badge-success p-2">providers</span></li>
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">ASP.NET</span></li>
</ul>

Perhaps one of the most ubiquitous means of user management in an ASP.NET application is the oft-maligned Membership library, but let's be honest; **the default Membership tools are pretty terrible.** If you use the default `Membership`, `Roles`, and `Profile` providers, you're going to have the awesome privilege of dealing with a database schema that revolves around serializing user information to `BLOB` fields.

**Yuck.**

Fortunately, you can use the provider model AND still maintain a sane, usable database schema; especially helpful when trying to integrate with an existing user store. And how do we accomplish this minor miracle? Well, I'm glad you asked!

See, it's easy to forget sometimes that a lot of the classes we use as part of the .NET framework are not sealed, which means we can extend their functionality through inheritance, or (in the case of abstract classes like `MembershipProvider`) implement our own derived classes, which can then be plugged into any library that is built to accept the base type as a parameter or property. This is especially true of ASP.NET and the provider model. For this post, I'm going to cover how we can implement a custom `MembershipProvider`, and touch on how it integrates with my preferred method of authenticating users, `FormsAuthentication`.

#### The Gist

First, let's look at the code you need for a custom provider, and then I'll explain what still needs to be done:

```csharp
using System;
using System.Collections.Specialized;
using System.Configuration.Provider;
using System.Web.Configuration;
using System.Web.Security;
 
public class CustomMembershipProvider : MembershipProvider
{
    private string _applicationName, _passwordStrengthRegularExpression, _connectionString;
    private bool _requiresUniqueEmail, _requiresQuestionAndAnswer, _enablePasswordRetrieval, _enablePasswordReset;
    private int _passwordAttemptWindow, _minRequiredPasswordLength, _minRequiredNonAlphanumericCharacters, _maxInvalidPasswordAttempts;
     
    private MachineKeySection _machineKey; //Used when determining encryption key values.
    private MembershipPasswordFormat _passwordFormat = MembershipPasswordFormat.Hashed;
     
    public override string ApplicationName
    {
        get
        {
            return _applicationName;
        }
        set
        {
            _applicationName = value;
        }
    }
     
    public override int MaxInvalidPasswordAttempts
    {
        get { return _maxInvalidPasswordAttempts; }
    }
     
    public override int MinRequiredNonAlphanumericCharacters
    {
        get { return _minRequiredNonAlphanumericCharacters; }
    }
     
    public override int MinRequiredPasswordLength
    {
        get { return _minRequiredPasswordLength; }
    }
     
    public override int PasswordAttemptWindow
    {
        get { return _passwordAttemptWindow; }
    }
     
    public override MembershipPasswordFormat PasswordFormat
    {
        get { return _passwordFormat; }
    }
     
    public override string PasswordStrengthRegularExpression
    {
        get { return _passwordStrengthRegularExpression; }
    }
     
    public override bool RequiresQuestionAndAnswer
    {
        get { return _requiresQuestionAndAnswer; }
    }
     
    public override bool RequiresUniqueEmail
    {
        get { return _requiresUniqueEmail; }
    }
     
    public override bool EnablePasswordReset
    {
        get { return _enablePasswordReset; }
    }
     
    public override bool EnablePasswordRetrieval
    {
        get { return _enablePasswordRetrieval; }
    }
     
    public override bool ChangePassword( string username, string oldPassword, string newPassword )
    {
        throw new NotImplementedException();
    }
     
    public override bool ChangePasswordQuestionAndAnswer( string username, string password, string newPasswordQuestion, string newPasswordAnswer )
    {
        throw new NotImplementedException();
    }
     
    public override MembershipUser CreateUser( string username, string password, string email, string passwordQuestion, string passwordAnswer, bool isApproved, object providerUserKey, out MembershipCreateStatus status )
    {
        throw new NotImplementedException();
    }
     
    public override bool DeleteUser( string username, bool deleteAllRelatedData )
    {
        throw new NotImplementedException();
    }
     
    public override MembershipUserCollection FindUsersByEmail( string emailToMatch, int pageIndex, int pageSize, out int totalRecords )
    {
        throw new NotImplementedException();
    }
     
    public override MembershipUserCollection FindUsersByName( string usernameToMatch, int pageIndex, int pageSize, out int totalRecords )
    {
        throw new NotImplementedException();
    }
     
    public override MembershipUserCollection GetAllUsers( int pageIndex, int pageSize, out int totalRecords )
    {
        throw new NotImplementedException();
    }
     
    public override int GetNumberOfUsersOnline()
    {
        throw new NotImplementedException();
    }
     
    public override string GetPassword( string username, string answer )
    {
        throw new NotImplementedException();
    }
     
    public override MembershipUser GetUser( string username, bool userIsOnline )
    {
        throw new NotImplementedException();
    }
     
    public override MembershipUser GetUser( object providerUserKey, bool userIsOnline )
    {
        throw new NotImplementedException();
    }
     
    public override string GetUserNameByEmail( string email )
    {
        throw new NotImplementedException();
    }
     
    public override string ResetPassword( string username, string answer )
    {
        throw new NotImplementedException();
    }
     
    public override bool UnlockUser( string userName )
    {
        throw new NotImplementedException();
    }
     
    public override void UpdateUser( MembershipUser user )
    {
        throw new NotImplementedException();
    }
     
    public override bool ValidateUser( string username, string password )
    {
        throw new NotImplementedException(); // NOTE: should implement this
    }
     
    public override void Initialize(string name, NameValueCollection config)
    {
        if (config == null)
        {
            throw new ArgumentNullException("config");
        }
         
        if (name == null || name.Length == 0)
        {
            name = "CustomMembershipProvider";
        }
     
        if (String.IsNullOrEmpty(config["description"]))
        {
            config.Remove("description");
            config.Add("description", "Custom MembershipProvider");
        }
         
        // Initialize the abstract base class.
        base.Initialize(name, config);
         
        _applicationName = GetConfigValue(config, "applicationName", System.Web.Hosting.HostingEnvironment.ApplicationVirtualPath);
        _maxInvalidPasswordAttempts = Convert.ToInt32(GetConfigValue(config, "maxInvalidPasswordAttempts", "5"));
        _passwordAttemptWindow = Convert.ToInt32(GetConfigValue(config, "passwordAttemptWindow", "10"));
        _minRequiredNonAlphanumericCharacters = Convert.ToInt32(GetConfigValue(config, "minRequiredAlphaNumericCharacters", "1"));
        _minRequiredPasswordLength = Convert.ToInt32(GetConfigValue(config, "minRequiredPasswordLength", "7"));
        _passwordStrengthRegularExpression = Convert.ToString(GetConfigValue(config, "passwordStrengthRegularExpression", String.Empty));
        _enablePasswordReset = Convert.ToBoolean(GetConfigValue(config, "enablePasswordReset", "true"));
        _enablePasswordRetrieval = Convert.ToBoolean(GetConfigValue(config, "enablePasswordRetrieval", "true"));
        _requiresQuestionAndAnswer = Convert.ToBoolean(GetConfigValue(config, "requiresQuestionAndAnswer", "false"));
        _requiresUniqueEmail = Convert.ToBoolean(GetConfigValue(config, "requiresUniqueEmail", "true"));
     
        string temp_format = config["passwordFormat"];
        if (temp_format == null)
        {
            temp_format = "Hashed";
        }
         
        switch (temp_format)
        {
            case "Hashed":
                _passwordFormat = MembershipPasswordFormat.Hashed;
                break;
            case "Encrypted":
                _passwordFormat = MembershipPasswordFormat.Encrypted;
                break;
            case "Clear":
                _passwordFormat = MembershipPasswordFormat.Clear;
                break;
            default:
                throw new ProviderException("Password format not supported.");
        }
     
        var ConnectionStringSettings = WebConfigurationManager.ConnectionStrings[config["connectionStringName"]];
         
        if ((ConnectionStringSettings == null) || (string.IsNullOrWhiteSpace(ConnectionStringSettings.ConnectionString.Trim())))
        {
            throw new ProviderException("Connection string cannot be blank.");
        }
     
        _connectionString = ConnectionStringSettings.ConnectionString;
         
        // Get encryption and decryption key information from the configuration.
        var cfg = WebConfigurationManager.OpenWebConfiguration(System.Web.Hosting.HostingEnvironment.ApplicationVirtualPath);
        _machineKey = cfg.GetSection("system.web/machineKey") as MachineKeySection;
     
        if (_machineKey.ValidationKey.Contains("AutoGenerate"))
        {
            if (PasswordFormat != MembershipPasswordFormat.Clear)
            {
                throw new ProviderException("Hashed or encrypted passwords are not supported with auto-generated keys.");
            }
        }
    }
     
    private string GetConfigValue(NameValueCollection configuration, string key, string defaultValue)
    {
        if (configuration == null || String.IsNullOrEmpty(key))
        {
            return defaultValue;
        }
     
        return configuration[key];
    }
}
```

Amusingly, most of the methods that are defined in a `MembershipProvider` are not actually necessary if you don't plan on using FormsAuthentication beyond simply authenticating users. More than a few older tutorials might include something like `Membership.ValidateUser(userName, password)` within a login page; if you want that to work, you need to implement the `ValidateUser()` method in your custom provider. Pretty much everything else is done using the FormsAuthentication object; `FormsAuthentication.CreateAuthToken(userName, false)` and `FormsAuthentication.SignOut()` more or less handle signing a user in and out of your application.

#### What YOU Need to Do

The code above is the basic shell you'll need to create a custom Membership provider. To make it work, you'll need to add or amend the `<membership>` section in your web.config so that ASP.NET knows to use your provider. It should look similar to this:

```markup
<membership defaultProvider="CustomMembershipProvider">
  <providers>
	<clear />
	<add name="CustomMembershipProvider" 
		 type="Fully.Qualified.Namespace.CustomMembershipProvider" 
		 connectionStringName="YourConnectionStringName" 
		 enablePasswordRetrieval="false" 
		 enablePasswordReset="true" 
		 requiresQuestionAndAnswer="false" 
		 requiresUniqueEmail="true" 
		 maxInvalidPasswordAttempts="5" 
		 minRequiredPasswordLength="6" 
		 minRequiredNonalphanumericCharacters="0" 
		 passwordAttemptWindow="10" 
		 applicationName="/" />
  </providers>
</membership>
```

You also need, at a minimum, to add code to the `ValidateUser()` method to query your data store for a user matching the provided credentials.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C# Hashing Utility](/blog/c-hashing-utility)
[View all](/blog)
[(Don't) Catch 'Em All! <i class="fas fa-chevron-right"></i>](/blog/dont-catch-em-all)
</div>

