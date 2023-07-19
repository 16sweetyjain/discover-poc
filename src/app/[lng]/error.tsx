'use client';

const error = ({ error, reset }: { error: Error, reset: () => void }) => {
    return <div>
        {error.message}
    </div>
}

export default error;