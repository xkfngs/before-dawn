'use strict'
import React from 'react';

import SliderWithValue from './slider-with-value';

const _ = require('lodash');

export default class OptionsForm extends React.Component {
  constructor(props) {
    super(props);
//    this.state = { value: this.props.value };
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(e) {
    this.props.onChange(this.getValues());
  }

  renderOption(o, index, val) {
    var guts;
    var self = this;
    var ref = "option" + index;
    
    if ( o.type === "slider" ) {
      val = parseInt(val, 10);
      guts = <SliderWithValue name={o.name}
                              value={val}
                              min={o.min}
                              max={o.max}
                              ref={ref}
                              onChange={this.onChanged} />;             
    }
    else {
      guts = <input type="text" name={o.name}
                    defaultValue={val}
                    ref={ref}
                    onChange={this.onChanged} />;
    }

    return (
      <fieldset>
        <legend>{o.name}</legend>
        {guts}
      </fieldset>
    );
  }

  getValues() {
    var self = this;
    var data = {};
    _.each(this.props.saver.options, function(o, i) {
      var ref = "option" + i;
      data[o.name] = self.refs[ref].value;
    });
    
    return data;
  }

  render() {
    var self = this;
    var s = this.props.saver;
    var onChange = this.props.onChange;
    var values = s.settings;
    var head;

    var nodes = this.props.saver.options.map(function(o, i) {
      var val = values[o.name];
      //console.log(o, val);
      if ( typeof(val) === "undefined" ) {
        val = o.default;
      }

      return (
        <div key={i}>
          {self.renderOption(o, i, val)}
        </div>
      );
    });

    if ( nodes.length > 0 ) {
      head = "Options";
    }
    else {
      head = "";
    }
    
    return(<div><h1>{head}</h1>{nodes}</div>);
  }
}
