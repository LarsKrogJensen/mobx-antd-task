import * as React from "react";
import {Spin} from "antd";
import Flexbox from "flexbox-react";

export interface ILoadingProps {
    loading: boolean;
}


function withLoading<P extends ILoadingProps>(Comp: React.ComponentClass<P>
    | React.StatelessComponent<P>): React.ComponentClass<P> {
    return class WithLoading extends React.Component<P, {}> {
        public render() {
            if (this.props.loading) {
                return (
                    <Flexbox height="80px" flexDirection="row" justifyContent="center" alignItems="center">
                        <Spin/>
                    </Flexbox>
                );
            }
            // return <div/>
            return <Comp {...(this.props as any)} />
        }
    }
}

export default withLoading
