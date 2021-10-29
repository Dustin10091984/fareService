import React, { useState, useEffect } from 'react';
export const Loading = () => {
    return (
        <>
            <div className="text-center">
                <div className="spinner-border text-dark jt" role="status" style={{ width: "5rem", height: "5rem"}}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    )
}