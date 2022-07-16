import React from 'react';

function admin_login() {
    return [

        <div className="img-fluid sidenav">
            <img className="rectwhite img-fluid" src={require('../img/rect-white.png')} />
            <img className="rectgreen img-fluid" src={require('../img/rect-green.png')} />
        </div>,

        <div className="main">
            <div className="mx-auto col-4 mt-sm-5">
                <div className="login-form">
                    <h1 className="login text-center">LOGIN</h1>
                    <form>
                        <label>Username</label>
                        <div className="input-group">
                            <input type="text" className="form-control bg-transparent" />
                            <div className="input-group-prepend bg-transparent">
                                <span className="input-group-text bg-transparent" id="login_input">
                                    <img src={require('../img/id-icon.png')} className="input-group-prepend bg-transparent border-0"></img>
                                </span>
                            </div>
                        </div>
                        
                        <br className="mt-1" />

                        <label>Password</label>
                        <div className="input-group">
                            <input type="password" className="form-control bg-transparent" />
                            <div className="input-group-prepend bg-transparent">
                                <span className="input-group-text bg-transparent" id="login_input">
                                    <img src={require('../img/pw-icon.png')} className="input-group-prepend bg-transparent border-0"></img>
                                </span>
                            </div>
                        </div>
                        <div className="input-group-prepend text-end bg-transparent">
                        <span className="bg-transparent">
                                    <a href="" className="no-underline color-2">Forgot Password?</a>
                        </span>
                        </div>

                        <br className="mt-2"/>

                        <div className="mx-auto text-center" style={{ width: "100%" }}>
                            <button type="submit" className="btn btn-success mx-auto" style={{ width: "60%" }}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ];
}

export default admin_login;