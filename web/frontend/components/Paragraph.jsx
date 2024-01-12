import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
export default class Paragraph extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
    }
    this.Editor = {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
        ],
      },
      formats: [
        "header",
        "font",
        "background",
        "color",
        "code",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "script",
        "align",
        "direction",
        "link",
        "image",
        "code-block",
        "formula",
        "video",
      ],
    };
    this.formats = {};

    this.state = {
      text: this.props.data[this.props.index].setting.text,
      data: this.props.data[this.props.index],
      index: this.props.index,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  stripe_load = () => {
    var aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src = " https://js.stripe.com/v3/";

    document.head.appendChild(aScript);
    aScript.onload = () => {};
  };

  handleChange(value) {
    this.state.text=value
    this.setState({ text: value });

    let item = { ...this.state.data };
    let newItem = { ...item.setting };
    newItem.text = this.state.text;
    item.setting = newItem;
    this.state.data = item;
    this.setState({
      data: item,
    });

    this.props.saveData(this.state.data);
  }

  render() {
    this.stripe_load();
    if (typeof window !== "undefined" && ReactQuill) {
      return (
        <ReactQuill
          theme="snow"
          className="mb-4"
          modules={this.Editor.modules}
          formats={this.Editor.formats}
          preserveWhitespace={true}
          value={this.state.text}
          onChange={this.handleChange}
        />
      );
    } else {
      return <textarea />;
    }
  }
}
