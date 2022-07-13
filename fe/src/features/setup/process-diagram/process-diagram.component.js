import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { ViewActionCreator } from 'src/redux/action_creators/view-action-creator';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);



const OverviewFlow = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  console.log(props)

  return (
    <ReactFlow
      nodes={props.nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

OverviewFlow.propTypes = {
  nodes : PropTypes.array,
  edges: PropTypes.array
}

class ProcessDiagramComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      SHOW_THEN: false,
      action_type : ""
    })
  }

  render() {
    if (!this.state){
      return <></>
    }
    return (
          <div style={{"height" :"600px"}}>
            <OverviewFlow nodes={this.props.nodes} edges={this.props.edges} ></OverviewFlow>
          </div>
    )
  }
}


ProcessDiagramComponent.propTypes = {
  showView: PropTypes.func,
  activeKey: PropTypes.number,
  view_state : PropTypes.object,
  nodes : PropTypes.array,
  edges : PropTypes.array
}
const mapStateToProps = (state) => {
  return {
    activeKey: state.MANAGE_RULES_ACTIVE_TAB,
    ruleParams: state.RULE_PARAMS,
    conditions: state.CONDITIONS,
    view_state  : state.VIEW_STATE,
    nodes : state.NODES,
    edges : state.EDGES
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showView : (modalName, visible) => dispatch(ViewActionCreator.showViewActionCreator(modalName, visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDiagramComponent)
