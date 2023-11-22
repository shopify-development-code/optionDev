import React, { Component } from "react";
import {
  Text,
  Checkbox,
  Select,
  Button,
  Popover,
  OptionList,
  Card,
  DatePicker,
} from "@shopify/polaris";
import Flatpickr from "react-flatpickr";
export default class DateTime extends Component {
  constructor(props) {
    super(props);
    this.date_options = [
      { label: "Disable Dates", value: "disablingDates" },
      { label: "Enable Dates", value: "enablingDates" },
    ];
    this.date_formats = [
      { label: "YYYY-MM-DD", value: "Y-m-d" },
      { label: "DD-MM-YYYY", value: "d-m-Y" },
      { label: "MM-DD-YYYY", value: "m-d-Y" },
    ];
    this.time_formats = [
      { label: "12H", value: "12HR" },
      { label: "24H", value: "24HR" },
    ];
    this.locallization = [
      { label: "English", value: "es_lang" },
      { label: "Arabic", value: "arabic_lang" },
      { label: "Austria", value: "austira_lang" },
    ];

    this.tabs = [
      {
        id: "date-and-time",
        content: "Date And Time",
      },
      {
        id: "date-2",
        content: "Date",
      },
      {
        id: "time-3",
        content: "Time",
      },
    ];
    this.state = {
      data: this.props.data,
      selected: this.props.data[this.props.index].setting.selected,
      index: this.props.index,
      rangePopup: false,
      daysOfWeek: false,
      specificPopup: false,
      weekPopup: false,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.getLanguages = this.getLanguages.bind(this);
    this.limitDates = this.limitDates.bind(this);
    this.rangeSelector = this.rangeSelector.bind(this);
    this.specificDateSelector = this.specificDateSelector.bind(this);
    this.weekDaySelector = this.weekDaySelector.bind(this);
    this.toggleWeekPopup = this.toggleWeekPopup.bind(this);
  }

  handleSelectChange = (value, id) => {
    this.props.handleDate(value, id);
  };

  handleTabChange(e) {
    this.setState({
      selected: e,
    });
    if (e == 0) {
      this.props.handleDate("Date-And-Time", "main_format");
    } else if (e == 1) {
      this.props.handleDate("Date", "main_format");
    } else if (e == 2) {
      this.props.handleDate("Time", "main_format");
    }
  }
  getLanguages() {
    if (this.props.data[this.state.index].setting.language) {
      return <div></div>;
    } else {
      return <div></div>;
    }
  }
  rangeSelector() {
    if (this.props.data[this.state.index].setting.limitDateRangeEnabled) {
      return (
        <Flatpickr
          onChange={(date) => {
            function convert(str) {
              var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
              return [date.getFullYear(), mnth, day].join("-");
            }
            let rangeArr = [];
            let rangeObj = {
              from: "",
              to: "",
            };
            if (date.length == 2) {
              date.map((element, index) => {
                if (index == 0) {
                  let from = convert(element);
                  rangeObj.from = from;
                  rangeArr.push(from);
                } else if (index == 1) {
                  let to = convert(element);
                  rangeObj.to = to;
                  rangeArr.push(to);
                }
              });
              this.props.handleDate(rangeArr, "limitRangeDates");
              this.props.handleDate(rangeObj, "limitRangeObject");
            } else {
              this.props.handleDate(rangeArr, "limitRangeDates");
              this.props.handleDate(rangeObj, "limitRangeObject");
            }
          }}
          className="specific-date-picker"
          options={{
            mode: "range",
            dateFormat: "Y-m-d",
            defaultDate:
              this.props.data[this.state.index].setting.limitDateRangeDates,
          }}
        />
      );
    } else {
      return <div></div>;
    }
  }
  specificDateSelector() {
    if (this.props.data[this.state.index].setting.limitDateSpecificEnabled) {
      return <div></div>;
    } else {
      return <div></div>;
    }
  }

  toggleWeekPopup() {
    if (this.state.weekPopup) {
      this.setState({
        weekPopup: false,
      });
    } else {
      this.setState({
        weekPopup: true,
      });
    }
  }
  weekDaySelector() {
    if (this.props.data[this.state.index].setting.limitDateDOWEnabled) {
      let activator = (
        <Button onClick={this.toggleWeekPopup} disclosure>
          Select Week Days
        </Button>
      );
      return (
        <Popover
          active={this.state.weekPopup}
          activator={activator}
          onClose={this.toggleWeekPopup}
        >
          <Card>
            <OptionList
              title="Select Week Days"
              onChange={(data) => {
                this.props.handleDate(data, "daysofweek");
              }}
              options={[
                { value: "x-mon", label: "Monday" },
                { value: "x-tue", label: "Tuesday" },
                { value: "x-wed", label: "Wednesday" },
                { value: "x-thu", label: "Thrusday" },
                { value: "x-fri", label: "Friday" },
                { value: "x-sat", label: "Saturday" },
                { value: "x-sun", label: "Sunday" },
              ]}
              selected={
                this.props.data[this.state.index].setting.limitDateDOWDates
              }
              allowMultiple
            />
          </Card>
        </Popover>
      );
    } else {
      return <div></div>;
    }
  }

  limitDates() {
    if (this.props.data[this.state.index].setting.isLimitDate) {
      return (
        <div>
          <Select
            id="limit_date_type"
            label="Limit Date Type"
            options={this.date_options}
            onChange={this.handleSelectChange}
            value={this.props.data[this.state.index].setting.limitDateType}
          />

          <div style={{ marginTop: "10px" }}>
            <Checkbox
              label=" Range Dates"
              checked={
                this.props.data[this.state.index].setting.limitDateRangeEnabled
              }
              id="range_dates"
              onChange={this.handleSelectChange}
            />
            {this.rangeSelector()}
            <Checkbox
              label="Days Of Week"
              checked={
                this.props.data[this.state.index].setting.limitDateDOWEnabled
              }
              id="week_days"
              onChange={this.handleSelectChange}
            />
            {this.weekDaySelector()}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  changeTab() {
    return (
      <div>
        <div>
          <Checkbox
            label="Disable dates in the past"
            checked={this.props.data[this.state.index].setting.disablePastDates}
            id="disable_past_dates"
            onChange={this.handleSelectChange}
          />
          <Checkbox
            label="Limit Date Picker"
            checked={this.props.data[this.state.index].setting.isLimitDate}
            id="limit_dates"
            onChange={this.handleSelectChange}
          />
        </div>
        <div className="date_picker_setting">{this.limitDates()}</div>
        <div className="select-date-format">
          {this.getLanguages()}
          <Select
            id="date_format"
            label="Date format"
            options={this.date_formats}
            onChange={this.handleSelectChange}
            value={this.props.data[this.state.index].setting.date_format}
          />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="datetime_setting">
        <Text variation="strong">Format</Text>
        {this.changeTab()}
      </div>
    );
  }
}
