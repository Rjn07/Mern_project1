import styles from "./style.module.css";




const main =()=>{ 
    const handleLogout  =()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }

    return(
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MyBook</h1>
                <button className={styles.white_btn}  onClick={handleLogout}>
                    Signout
                </button>
            </nav>
        </div>
    )
}
export default main;