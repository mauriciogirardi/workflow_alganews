import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { EditorProfileView } from 'app/views/EditorProfileView';
import { EditorsListView } from 'app/views/EditorsListView';
import { PostCreateView } from 'app/views/PostCreateView';
import { NotFound404 } from 'app/views/NotFound404';
import { info } from 'core/utils/info';

import HomeView from '../views/HomeView';
import Calendar from 'app/views/Calendar';

export const MainRoutes = () => {
    useEffect(() => {
        window.onunhandledrejection = (error: PromiseRejectionEvent) => {
            info({
                title: error.reason.response?.data.title || 'Error',
                description:
                    error.reason.response?.data.detail || error.reason.message,
                status: 'error',
            });
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/editores" element={<EditorsListView />} />
            <Route path="/editores/:id" element={<EditorProfileView />} />
            <Route path="/posts/criar" element={<PostCreateView />} />
            <Route path="/posts/editar/:id" element={<PostCreateView />} />

            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<NotFound404 />} />
        </Routes>
    );
};
