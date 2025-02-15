export const variants = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { 
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    },
    showFromRight: {
        initial: { x: 20, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    },
    showFromLeft: {
        initial: { x: -20, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    },
}