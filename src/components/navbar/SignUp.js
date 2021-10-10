const SignUp = () => {

    return (
        <div className="nav-item dropdown">
            <a href="#" data-toggle="dropdown" className="btn btn-primary dropdown-toggle sign-up-btn">Sign
                up</a>
            <div className="dropdown-menu action-form">
                <form action="/examples/actions/confirmation.php" method="post">
                    <p className="hint-text">Fill in this form to create your account!</p>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username"
                               required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"
                               required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm Password"
                               required="required"/>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label"><input type="checkbox" required="required"/> I
                            accept the <a href="#">Terms &amp; Conditions</a></label>
                    </div>
                    <input type="submit" className="btn btn-primary btn-block" value="Sign up"/>
                </form>
            </div>
        </div>
    )
}

export default SignUp