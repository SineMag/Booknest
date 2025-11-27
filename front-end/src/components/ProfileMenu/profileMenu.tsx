import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import type { AppDispatch, RootState } from "../../../store";
import ProfileIcon from "../ProfileIcon/profileIcon";
import styles from "./profileMenu.module.css";

type Role = "user" | "admin";

type ProfileMenuProps = {
  userType?: Role; // optional override
  isLoggedIn?: boolean; // optional override
};

export default function ProfileMenu({
  userType,
  isLoggedIn,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<Role | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoggedIn: reduxLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  /** -------------------------------------------
   * Determine Login State
   * ------------------------------------------- */
  const loggedIn = isLoggedIn ?? reduxLoggedIn;

  /** -------------------------------------------
   * FIXED + ADVANCED ROLE DETECTION
   * ------------------------------------------- */
  // Robust admin detection: check multiple possible fields returned by different backends
  const isAdminFlag = (() => {
    if (!user) return false;
    const u: any = user;
    const roleVal = (u.role ??
      u.userType ??
      u.type ??
      u.accountType ??
      u.roleName) as string | undefined;
    if (roleVal && typeof roleVal === "string") {
      if (roleVal.toLowerCase().includes("admin")) return true;
    }
    if (typeof u.isAdmin === "boolean") return u.isAdmin === true;
    if (typeof u.admin === "boolean") return u.admin === true;
    if (typeof u.is_admin === "boolean") return u.is_admin === true;
    // fallback: check common boolean-like strings
    if (typeof u.role === "number" && u.role === 1) return true;
    return false;
  })();

  const resolvedRole: Role = userType ?? (isAdminFlag ? "admin" : "user");

  /** -------------------------------------------
   * LOGOUT HANDLER
   * ------------------------------------------- */
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  /** -------------------------------------------
   * ROLE-BASED MENU CONFIG
   * ------------------------------------------- */
  const menus: Record<
    Role,
    Array<{ label: string; to: string; logout?: boolean }>
  > = {
    user: [
      { label: "HOME", to: "/" },
      { label: "PROFILE", to: "/profile" },
      { label: "MY BOOKINGS", to: "/my-bookings" },
      { label: "MY FAVORITES", to: "/my-favorites" },
      { label: "LOGOUT", to: "/", logout: true },
    ],

    admin: [
      { label: "HOME", to: "/" },
      { label: "PROFILE", to: "/profile" },
      { label: "DASHBOARD", to: "/adminDashboard" },
      { label: "RESERVATION", to: "/reservation" },
      { label: "INVENTORY", to: "/inventoryManagement" },
      { label: "LOGOUT", to: "/", logout: true },
    ],
  };

  /** -------------------------------------------
   * NOT LOGGED IN → ROLE SELECTOR
   * ------------------------------------------- */
  if (!loggedIn) {
    return (
      <div className={styles.wrapper}>
        <ProfileIcon
          onClick={() => {
            setOpen(!open);
            setSubMenu(null);
          }}
        />

        {open && (
          <div className={styles.menu}>
            <div className={styles.selector}>
              {/* USER OPTION */}
              <button
                type="button"
                className={styles.selectorBtn}
                onClick={() => setSubMenu(subMenu === "user" ? null : "user")}
              >
                User
              </button>

              {subMenu === "user" && (
                <div className={styles.submenu}>
                  <Link to="/register">Register as User</Link>
                  <Link to="/login">Login as User</Link>
                </div>
              )}

              {/* ADMIN OPTION */}
              <button
                type="button"
                className={styles.selectorBtn}
                onClick={() => setSubMenu(subMenu === "admin" ? null : "admin")}
              >
                Admin
              </button>

              {subMenu === "admin" && (
                <div className={styles.submenu}>
                  <Link to="/adminRegister">Register as Admin</Link>
                  <Link to="/adminlogin">Login as Admin</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /** -------------------------------------------
   * LOGGED IN → SHOW USER OR ADMIN MENU
   * ------------------------------------------- */
  return (
    <div className={styles.wrapper}>
      <ProfileIcon onClick={() => setOpen(!open)} />

      {open && (
        <div className={styles.menu}>
          {menus[resolvedRole].map((item, index) =>
            item.logout ? (
              <Link
                key={index}
                to={item.to}
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                {item.label}
              </Link>
            ) : (
              <Link key={index} to={item.to}>
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
