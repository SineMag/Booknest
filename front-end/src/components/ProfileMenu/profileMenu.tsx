import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import type { AppDispatch, RootState } from "../../../store";
import ProfileIcon from "../ProfileIcon/profileIcon";
import styles from "./profileMenu.module.css";

type Role = "user" | "admin";

type ProfileMenuProps = {
  userType?: Role;
  isLoggedIn?: boolean;
};

export default function ProfileMenu({
  userType,
  isLoggedIn,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<Role | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { user, isLoggedIn: reduxLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const loggedIn = isLoggedIn ?? reduxLoggedIn;

  /** -------------------------------------------
   * ADVANCED ROLE DETECTION
   * ------------------------------------------- */
  const isAdminFlag = (() => {
    if (!user) return false;
    const u: any = user;

    const roleVal = (u.role ??
      u.userType ??
      u.type ??
      u.accountType ??
      u.roleName) as string | undefined;

    if (roleVal?.toLowerCase().includes("admin")) return true;

    if (u.isAdmin === true) return true;
    if (u.admin === true) return true;
    if (u.is_admin === true) return true;

    if (typeof u.role === "number" && u.role === 1) return true;

    return false;
  })();

  const resolvedRole: Role = userType ?? (isAdminFlag ? "admin" : "user");

  /** -------------------------------------------
   * CLOSE ON OUTSIDE CLICK
   * ------------------------------------------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSubMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** -------------------------------------------
   * LOGOUT HANDLER
   * ------------------------------------------- */
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  /** -------------------------------------------
   * MENU LIST BASED ON ROLE
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
      { label: "DASHBOARD", to: "/admin-dashboard" },
      { label: "RESERVATION", to: "/reservation-management" },
      { label: "INVENTORY", to: "/inventory-management" },
      { label: "LOGOUT", to: "/", logout: true },
    ],
  };

  /** -------------------------------------------
   * NOT LOGGED IN → LOGIN/REGISTER SELECTOR
   * ------------------------------------------- */
  if (!loggedIn) {
    return (
      <div className={styles.wrapper} ref={menuRef}>
        <ProfileIcon
          onClick={() => {
            setOpen(!open);
            setSubMenu(null);
          }}
        />

        {open && (
          <div className={`${styles.menu} ${styles.open}`}>
            <div className={styles.selector}>
              <button
                type="button"
                className={styles.selectorBtn}
                onClick={() => setSubMenu(subMenu === "user" ? null : "user")}
              >
                User
              </button>

              {subMenu === "user" && (
                <div className={styles.submenu}>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    Register as User
                  </Link>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login as User
                  </Link>
                </div>
              )}

              <button
                type="button"
                className={styles.selectorBtn}
                onClick={() => setSubMenu(subMenu === "admin" ? null : "admin")}
              >
                Admin
              </button>

              {subMenu === "admin" && (
                <div className={styles.submenu}>
                  <Link to="/admin-register" onClick={() => setOpen(false)}>
                    Register as Admin
                  </Link>
                  <Link to="/admin-login" onClick={() => setOpen(false)}>
                    Login as Admin
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /** -------------------------------------------
   * LOGGED IN → USER/ADMIN MENU
   * ------------------------------------------- */
  return (
    <div className={styles.wrapper} ref={menuRef}>
      <ProfileIcon onClick={() => setOpen(!open)} />

      {open && (
        <div className={`${styles.menu} ${styles.open}`}>
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
              <Link
                key={index}
                to={item.to}
                onClick={() => setOpen(false)} // auto close
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
