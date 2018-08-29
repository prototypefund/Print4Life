import { environment } from '../../environments/environment';
const backendUrl = !environment.production ? 'http://localhost:3000/api/v1' : 'http://iot-fablab.ddns.net:3000/api/v1';

export const routes = {
    backendUrl: backendUrl,
    paths: {
        backend: {
            users: {
                root: 'users',
                getRoles: 'roles'
            },
            orders: {
                root: 'orders',
                getStatus: 'status',
                getOrder: 'getOrder',
                comment: 'comment',
                count: 'count',
                search: 'search'
            },
            machines: {
                root: 'machines',
                byId: ':type/:id',
                getAll: '',
                machineTypes: 'types',
                materials: 'materials',
                laserTypes: 'laserTypes',
                count: 'count'
            },
            fablabs: {
                root: 'fablabs',
                getById: ':id'
            }
        },
        frontend: {
            users: {
                root: 'users',
                signup: 'signup',
                login: 'login',
                update: 'edit'
            },
            orders: {
                root: 'orders',
                create: 'create',
                update: 'update',
                delete: 'delete',
                detail: 'detail',
                getOrderById: 'getById',
                getAllOrders: '',
                getStatus: 'status',
                getOrder: 'getOrder'
            },
            machines: {
                root: 'machines',
                create: 'create',
                update: 'update',
                delete: 'delete',
                getById: ':type/:id',
                getAll: '',
                machineTypes: 'types',
                materials: 'materials',
                laserTypes: 'laserTypes'
            },
            fablabs: {
                root: 'fablabs',
                getById: ':id'
            }
        },
    }
};



