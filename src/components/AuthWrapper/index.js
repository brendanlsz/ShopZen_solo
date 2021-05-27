import React from "react";
import "./styles.scss";

const AuthWrapper = ({ headline, children }) => {
  return (
    <div className="formwrap">
      <div class="form-body">
        <div class="row">
          <div class="form-holder">
            <div class="form-content">
              <div class="form-items">
                {headline && <h3>{headline}</h3>}
                <div className="children">{children && children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
