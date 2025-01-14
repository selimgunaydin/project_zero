interface Widget {
  _id: string;
  type: string;
  data: any;
}

interface Props {
  widgets: Widget[];
}

export default function WidgetRenderer({ widgets }: Props) {
  return (
    <>
      {widgets.map((widget) => {
        return (
          <div
            key={widget._id}
            dangerouslySetInnerHTML={{ __html: widget.data }}
          ></div>
        );
      })}
    </>
  );
}
