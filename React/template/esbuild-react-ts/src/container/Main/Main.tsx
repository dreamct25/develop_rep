import React, { FC,Suspense } from "react";
import { Routes,Route,Navigate,useNavigate } from 'react-router-dom'
import routes from '../../router';
import { MainProps } from './types'
import { Container } from '.'


const Main:FC<MainProps> = ({ a }):JSX.Element => {
    const router = useNavigate()

    return (
        <Container>
            <h1>
                Hello React & Esbuild
            </h1>
            <div>Main Props {a}</div>
            <div className="route-layout">
                <Suspense fallback={<div>Loading</div>}>
                    <Routes>
                        {routes.map(({ path,element },index) => (<Route key={index} path={path} element={element} />))}
                        <Route path="*" element={<Navigate replace to={'/pageI'} />} />
                    </Routes>
                </Suspense>
            </div>
            <div className="btn-group">
                <div onClick={() => router({ pathname:'/pageI'},{ state:{ say:'hello PageI' } })}>Go PageI</div>
                <div onClick={() => router({ pathname:'/pageII',search:'say=Hello PageII' })}>Go PageII</div>
            </div>
        </Container>
    )
}

export default Main