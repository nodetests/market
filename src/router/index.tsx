import React, { lazy, Suspense} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BaseLayout  from '../layout/BaseLayout'
// import SimpleLayout from '../layout/SimpleLayout'
// login
// Home Page
const Index = lazy(() => import(/* webpackChunkName: 'Index'*/ '../pages/Home'))
// PlayGame Page
const PlayGame = lazy(() => import(/* webpackChunkName: 'Index'*/ '../pages/PlayGame'))
// MarkPlace page
const MarketPlace = lazy(() => import(/* webpackChunkName: 'Index'*/ '../pages/MarketPlace'))

// Staking Page
const Staking = lazy(() => import('../pages/Staking'))
// WihtePages Page
const WihtePages = lazy(() => import('../pages/WihtePages'))
// NftDetail Page
const NftDetail = lazy(() => import('../component/NftDetail'))

const RouterContainer: React.FC = (props: any) => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route
              path="/MarkPlace"
              render={() => (
                <SimpleLayout>
                  <Switch>
                    <Route path="/MarkPlace/NftDetail" component={NftDetail} />
                  </Switch>
                </SimpleLayout>
              )}
          /> */}
          <Route
            path="/"
            render={() =>
                <BaseLayout>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      <Route exact path="/" component={Index} />
                      <Route path="/Index" component={Index} />
                      <Route path="/PlayGame" component={PlayGame} />
                      <Route path="/MarketPlace" component={MarketPlace} />
                      <Route path= '/NftDetail' component={NftDetail} />
                      <Route path="/Staking" component={Staking} />
                      <Route path="/WihtePages" component={WihtePages} />
                     
                    </Switch>
                  </Suspense>
                </BaseLayout> 
            }
          />
        </Switch>
      </BrowserRouter>
    </>
  )
}




export default RouterContainer
