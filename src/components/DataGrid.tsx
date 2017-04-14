import * as React from "react";
import {LoadingProps, default as withLoading} from "./Loading";

export interface DataGridProps{
    footer?: JSX.Element
}

export class DataGrid extends React.Component<DataGridProps, {}> {
    render() {
        return (
            <div className="ant-table ant-table-middle ant-table-bordered ant-table-scroll-position-left">
                <div className="ant-table-content">
                    <div className="ant-table-body">
                        <table>
                            {this.props.children}
                        </table>
                        {this.props.footer}
                    </div>
                </div>
            </div>
        );
    }
}

export const DataGridFooter = (props) => {
    return (
        <div className="ant-table-footer">
            {props.children}
        </div>
    );
}

export const DataGridHeader = (props) => {
    return (
        <thead className="ant-table-thead">
        {props.children}
        </thead>
    );
}

export const DataGridHeaderRow = (props) => {
    return (
        <tr>
            {props.children}
        </tr>
    );
}

export const DataGridHeaderCell = (props) => {
    return (
        <th>
            {props.children}
        </th>
    );
}

export const DataGridRow = (props) => {
    return (
        <tr className="ant-table-row  ant-table-row-level-0">
            {props.children}
        </tr>
    );
}

export const DataGridCell = (props) => {
    return (
        <td>
            <span className="ant-table-row-indent indent-level-0"
                  style={{paddingLeft: "0px"}}>{props.children}</span>
        </td>
    );
}



export const DataGridBody = withLoading((props) => {
    return (
        <tbody className="ant-table-tbody">
        {props.children}
        </tbody>
    )
})

