function Footer() {

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
        },

        text: {
            color: '#797777',
            textDecoration: 'none'
        }
    }

    return (
        <div className="container-fluid" style={styles.container}>
            <p style={styles.text}>
                &copy; LocalLoop 2025
            </p>
            <a href="mailto:info.localloop@gmail.com" style={styles.text}>info.localloop@gmail.com</a>
        </div>
    );
}

export default Footer;