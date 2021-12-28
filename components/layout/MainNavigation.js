import classes from './MainNavigation.module.css'
const MainNavigation = () => {
    return (
        <div>
            <header className={classes.header}>
                <div className={classes.logo}>React Meetups</div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>All Meetups</Link>
                        </li>
                        <li>
                            <Link to='/new-meetup'>Add New Meetup</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default MainNavigation;