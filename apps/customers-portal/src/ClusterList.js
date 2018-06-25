import React, { Component } from 'react';
import classNames from 'classnames';
import { ListView, Button, Row, Col } from 'patternfly-react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

export const renderActions = () => (
  <div>
    <Button>Details</Button>
  </div>
);

export const renderAdditionalInfoItems = itemProperties =>
  itemProperties &&
  Object.keys(itemProperties).map(prop => {
    const cssClassNames = classNames('pficon', {
      'pficon-flavor': prop === 'hosts',
      'pficon-cluster': prop === 'clusters',
      'pficon-container-node': prop === 'nodes',
      'pficon-image': prop === 'images'
    });
    return (
      <ListView.InfoItem key={prop}>
        <span className={cssClassNames} />
        <strong>{itemProperties[prop]}</strong> {prop}
      </ListView.InfoItem>
    );
});


class ClusterList extends Component {
  static propTypes = {
    clusters: PropTypes.array.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.clusters.length !== 0); 
  }
  
  render() {
    // console.log('rerender list. props: ', this.props )
    return (
      <div>
        {/* <Button onClick={() => {setTimeout(() => {this.createCluster(); this.createCluster();}, 1000)}}>Add cluster</Button> */}
        <ListView>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={true}
          transitionEnterTimeout={500}
          transitionLeave={false}>

          {this.props.clusters.map(({ actions, properties, title, description, expandedContentText, hideCloseIcon }, index) => (
            <ListView.Item
              key={title}
              actions={renderActions(actions)}
              checkboxInput={<input type="checkbox" />}
              leftContent={<ListView.Icon name="cluster" type="pf" />}
              additionalInfo={renderAdditionalInfoItems(properties)}
              heading={title}
              description={description}
              stacked={false}
              hideCloseIcon={false}
            >
              <Row>
                <Col sm={11}>{expandedContentText}</Col>
              </Row>
            </ListView.Item>
          ))}
        </ReactCSSTransitionGroup>
          
        </ListView>
      </div>
    );
  }
}

export { ClusterList };
