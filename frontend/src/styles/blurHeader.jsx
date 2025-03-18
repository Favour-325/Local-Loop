import React from "react";
import propTypes from "prop-types";

const BlurHeader = ({ image, title}) => {
    const styles = {
        blurredHeader: {
            position: 'relative',
            height: '250px',
            width: '100%',
            background: `url(${image}) no-repeat`
        },
    
        blurOverlay: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
            background: '',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            padding: '20px',
        },
    };

    return (
        <section className='container-fluid pb-4 px-0'>
            <div style={styles.blurredHeader}>
                <div style={styles.blurOverlay}>
                    <h1 className='display-4 fw-semibold'>{title}</h1>
                </div>
            </div>
        </section>
    );
};

// To enforce propType validation
BlurHeader.propTypes = {
    image: propTypes.string.isRequired, // Ensures 'image' prop is a required string
};

export default BlurHeader;