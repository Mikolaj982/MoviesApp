export const styles = {
    controls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    nextPrevButton: {
        '@media screen and (min-width: 786px)': {
            margin: '0 7px',
        },
        border: 'none',
        margin: '0 2px',
        borderRadius: '10px',
        backgroundColor: 'transparent',
        display: 'flex',
    },
    nextPrevButtonDisabled: {
        opacity: 0.3
    },
    pagination: {
        display: 'flex'
    },
    paginationButton: {
        '@media screen and (min-width: 786px)': {
            margin: '0 7px',
        },
        margin: '0 2px',
        height: '12px',
        backgroundColor: '#827575',
        borderRadius: '50px',
        cursor: 'pointer',
        border: 'none'
    },
    paginationButtonActive: {
        opacity: 0.3
    },
    pageIndicator: {
        display: 'flex',
        justifyContent: 'center'
    },
    img: {
        cursor: 'pointer',
        color: 'white',
        height: '28px'
    },
}