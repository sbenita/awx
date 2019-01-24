import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {
  I18n,
  I18nProvider,
} from '@lingui/react';
import { t } from '@lingui/macro';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly-next/patternfly.css';
import './app.scss';
import './components/Pagination/styles.scss';
import './components/DataListToolbar/styles.scss';

import APIClient from './api';

import App from './App';
import Background from './components/Background';
import Applications from './pages/Applications';
import Credentials from './pages/Credentials';
import CredentialTypes from './pages/CredentialTypes';
import Dashboard from './pages/Dashboard';
import InstanceGroups from './pages/InstanceGroups';
import Inventories from './pages/Inventories';
import InventoryScripts from './pages/InventoryScripts';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import ManagementJobs from './pages/ManagementJobs';
import NotificationTemplates from './pages/NotificationTemplates';
import Organizations from './pages/Organizations/Organizations';
import Portal from './pages/Portal';
import Projects from './pages/Projects';
import Schedules from './pages/Schedules';
import AuthSettings from './pages/AuthSettings';
import JobsSettings from './pages/JobsSettings';
import SystemSettings from './pages/SystemSettings';
import UISettings from './pages/UISettings';
import License from './pages/License';
import Teams from './pages/Teams';
import Templates from './pages/Templates';
import Users from './pages/Users';
import ja from '../build/locales/ja/messages';
import en from '../build/locales/en/messages';

//
// Initialize http
//

const http = axios.create({ xsrfCookieName: 'csrftoken', xsrfHeaderName: 'X-CSRFToken' });

//
// Derive the language and region from global user agent data. Example: es-US
// see: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
//

export function getLanguage (nav) {
  const language = (nav.languages && nav.languages[0]) || nav.language || nav.userLanguage;
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

  return languageWithoutRegionCode;
}

//
//  Function Main
//

export async function main (render, api) {
  const catalogs = { en, ja };
  const language = getLanguage(navigator);

  const el = document.getElementById('app');
  const { data: { custom_logo, custom_login_info } } = await api.getRoot();

  const defaultRedirect = () => (<Redirect to="/home" />);
  const loginRoutes = (
    <Switch>
      <Route
        path="/login"
        render={() => (
          <Login
            api={api}
            logo={custom_logo}
            loginInfo={custom_login_info}
          />
        )}
      />
      <Redirect to="/login" />
    </Switch>
  );

  return render(
    <HashRouter>
      <I18nProvider
        language={language}
        catalogs={catalogs}
      >
        <I18n>
          {({ i18n }) => (
            <Background>
              {!api.isAuthenticated() ? loginRoutes : (
                <Switch>
                  <Route path="/login" render={defaultRedirect} />
                  <Route exact path="/" render={defaultRedirect} />
                  <Route
                    render={() => (
                      <App
                        api={api}
                        navLabel={i18n._(t`Primary Navigation`)}
                        routeGroups={[
                          {
                            groupTitle: i18n._(t`Views`),
                            groupId: 'views_group',
                            routes: [
                              {
                                title: i18n._(t`Dashboard`),
                                path: '/home',
                                component: Dashboard
                              },
                              {
                                title: i18n._(t`Jobs`),
                                path: '/jobs',
                                component: Jobs
                              },
                              {
                                title: i18n._(t`Schedules`),
                                path: '/schedules',
                                component: Schedules
                              },
                              {
                                title: i18n._(t`My View`),
                                path: '/portal',
                                component: Portal
                              },
                            ],
                          },
                          {
                            groupTitle: i18n._(t`Resources`),
                            groupId: 'resources_group',
                            routes: [
                              {
                                title: i18n._(t`Templates`),
                                path: '/templates',
                                component: Templates
                              },
                              {
                                title: i18n._(t`Credentials`),
                                path: '/credentials',
                                component: Credentials
                              },
                              {
                                title: i18n._(t`Projects`),
                                path: '/projects',
                                component: Projects
                              },
                              {
                                title: i18n._(t`Inventories`),
                                path: '/inventories',
                                component: Inventories
                              },
                              {
                                title: i18n._(t`Inventory Scripts`),
                                path: '/inventory_scripts',
                                component: InventoryScripts
                              },
                            ],
                          },
                          {
                            groupTitle: i18n._(t`Access`),
                            groupId: 'access_group',
                            routes: [
                              {
                                title: i18n._(t`Organizations`),
                                path: '/organizations',
                                component: Organizations
                              },
                              {
                                title: i18n._(t`Users`),
                                path: '/users',
                                component: Users
                              },
                              {
                                title: i18n._(t`Teams`),
                                path: '/teams',
                                component: Teams
                              },
                            ],
                          },
                          {
                            groupTitle: i18n._(t`Administration`),
                            groupId: 'administration_group',
                            routes: [
                              {
                                title: i18n._(t`Credential Types`),
                                path: '/credential_types',
                                component: CredentialTypes
                              },
                              {
                                title: i18n._(t`Notifications`),
                                path: '/notification_templates',
                                component: NotificationTemplates
                              },
                              {
                                title: i18n._(t`Management Jobs`),
                                path: '/management_jobs',
                                component: ManagementJobs
                              },
                              {
                                title: i18n._(t`Instance Groups`),
                                path: '/instance_groups',
                                component: InstanceGroups
                              },
                              {
                                title: i18n._(t`Integrations`),
                                path: '/applications',
                                component: Applications
                              },
                            ],
                          },
                          {
                            groupTitle: i18n._(t`Settings`),
                            groupId: 'settings_group',
                            routes: [
                              {
                                title: i18n._(t`Authentication`),
                                path: '/auth_settings',
                                component: AuthSettings
                              },
                              {
                                title: i18n._(t`Jobs`),
                                path: '/jobs_settings',
                                component: JobsSettings
                              },
                              {
                                title: i18n._(t`System`),
                                path: '/system_settings',
                                component: SystemSettings
                              },
                              {
                                title: i18n._(t`User Interface`),
                                path: '/ui_settings',
                                component: UISettings
                              },
                              {
                                title: i18n._(t`License`),
                                path: '/license',
                                component: License
                              },
                            ],
                          },
                        ]}
                        render={({ routeGroups }) => (
                          routeGroups
                            .reduce((allRoutes, { routes }) => allRoutes.concat(routes), [])
                            .map(({ component: PageComponent, path }) => (
                              <Route
                                key={path}
                                path={path}
                                render={({ match }) => (
                                  <PageComponent
                                    api={api}
                                    match={match}
                                  />
                                )}
                              />
                            ))
                        )}
                      />
                    )}
                  />
                </Switch>
              )}
            </Background>
          )}
        </I18n>
      </I18nProvider>
    </HashRouter>, el
  );
}

main(ReactDOM.render, new APIClient(http));
